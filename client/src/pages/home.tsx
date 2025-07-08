import { useState } from "react";
import { Combine, Trash2, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/components/upload-zone";
import { FileCard } from "@/components/file-card";
import { CompressionSettingsPanel } from "@/components/compression-settings";
import { ComparisonModal } from "@/components/comparison-modal";
import { BatchQueuePanel } from "@/components/batch-queue-panel";
import { useImageCompression } from "@/hooks/use-image-compression";
import { UploadedFile } from "@shared/schema";
import { formatFileSize, downloadMultipleFiles } from "@/lib/image-utils";
import { Link } from "wouter";

export default function Home() {
  const {
    files,
    settings,
    stats,
    addFiles,
    compressFile,
    compressAllFiles,
    removeFile,
    clearAllFiles,
    updateSettings,
    batchProcessor,
  } = useImageCompression();

  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (file: UploadedFile) => {
    setPreviewFile(file);
    setIsModalOpen(true);
  };

  const handleDownloadAll = () => {
    const completedFiles = files
      .filter((f) => f.compressedBlob)
      .map((f) => ({
        blob: f.compressedBlob!,
        filename: `${f.name.replace(/\.[^/.]+$/, "")}_compressed.${f.name.split(".").pop()}`,
      }));

    if (completedFiles.length > 0) {
      downloadMultipleFiles(completedFiles);
    }
  };

  const pendingFiles = files.filter((f) => f.status === "pending");
  const completedFiles = files.filter((f) => f.status === "complete");
  const hasFiles = files.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-2 mr-2">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Combine className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  JPEG Compressor
                </h1>
                <p className="text-sm text-slate-500">
                  Smart image compression with quality control
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">
                  {stats.totalFiles} files processed
                </p>
                <p className="text-xs text-slate-500">
                  {formatFileSize(stats.totalSaved)} saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Upload Zone and File Processing Area */}
          <div className="lg:col-span-3">
            <UploadZone onFilesAdded={addFiles} hasFiles={hasFiles} />

            {/* File Processing Area */}
            {hasFiles && (
              <div className="mt-8">
                {/* Batch Queue Panel */}
                <BatchQueuePanel
                  stats={batchProcessor.getStats()}
                  isRunning={batchProcessor.isRunning}
                  concurrency={batchProcessor.concurrency}
                  onStart={() =>
                    batchProcessor.processBatch(
                      pendingFiles.map((f) => f.id),
                      compressFile,
                    )
                  }
                  onPause={batchProcessor.stopBatch}
                  onRetryFailed={() => batchProcessor.retryFailed(compressFile)}
                  onClear={batchProcessor.reset}
                  onConcurrencyChange={batchProcessor.setConcurrency}
                />

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Processing Files
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-slate-500 hover:text-slate-900"
                      onClick={clearAllFiles}
                    >
                      <Trash2 className="mr-1" size={16} />
                      Clear All
                    </Button>
                    {completedFiles.length > 0 && (
                      <Button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        onClick={handleDownloadAll}
                      >
                        <Download className="mr-2" size={16} />
                        Download All
                      </Button>
                    )}
                  </div>
                </div>

                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onRemove={removeFile}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <CompressionSettingsPanel
              settings={settings}
              stats={stats}
              onSettingsChange={updateSettings}
              onCompressAll={compressAllFiles}
              onResetSettings={() => {}}
              hasFiles={pendingFiles.length > 0}
            />
          </div>
        </div>
      </main>

      {/* Comparison Modal */}
      <ComparisonModal
        file={previewFile}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPreviewFile(null);
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-slate-500 mb-4 md:mb-0">
              <p>
                © 2025 JPEG Compressor. All images are processed locally in
                your browser.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-slate-900 transition-colors">
                Terms of Service
              </a>
              <a href="/help" className="hover:text-slate-900 transition-colors">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
