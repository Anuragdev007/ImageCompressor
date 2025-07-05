import { Play, Pause, RotateCcw, Settings, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BatchQueuePanelProps {
  stats: {
    pending: number;
    processing: number;
    completed: number;
    failed: number;
    total: number;
    progress: number;
  };
  isRunning: boolean;
  concurrency: number;
  onStart: () => void;
  onPause: () => void;
  onRetryFailed: () => void;
  onClear: () => void;
  onConcurrencyChange: (concurrency: number) => void;
}

export function BatchQueuePanel({
  stats,
  isRunning,
  concurrency,
  onStart,
  onPause,
  onRetryFailed,
  onClear,
  onConcurrencyChange
}: BatchQueuePanelProps) {
  if (stats.total === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Settings size={20} />
          Batch Processing Queue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Overview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium">Overall Progress</Label>
            <span className="text-sm text-slate-600">
              {stats.completed} of {stats.total} files
            </span>
          </div>
          <Progress value={stats.progress} className="h-3" />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{Math.round(stats.progress)}% complete</span>
            <span>{stats.total - stats.completed} remaining</span>
          </div>
        </div>

        {/* Queue Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-600">{stats.pending}</div>
            <div className="text-xs text-slate-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">{stats.processing}</div>
            <div className="text-xs text-slate-500">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">{stats.completed}</div>
            <div className="text-xs text-slate-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-red-600">{stats.failed}</div>
            <div className="text-xs text-slate-500">Failed</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Play/Pause Button */}
          {!isRunning ? (
            <Button
              onClick={onStart}
              disabled={stats.pending === 0}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Play size={16} className="mr-1" />
              Start Queue
            </Button>
          ) : (
            <Button
              onClick={onPause}
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <Pause size={16} className="mr-1" />
              Pause Queue
            </Button>
          )}

          {/* Retry Failed */}
          {stats.failed > 0 && (
            <Button
              onClick={onRetryFailed}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              <RotateCcw size={16} className="mr-1" />
              Retry Failed ({stats.failed})
            </Button>
          )}

          {/* Clear Queue */}
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-700"
          >
            Clear All
          </Button>
        </div>

        {/* Concurrency Setting */}
        <div className="flex items-center gap-3">
          <Label className="text-sm font-medium text-slate-700">Concurrent jobs:</Label>
          <Select
            value={concurrency.toString()}
            onValueChange={(value) => onConcurrencyChange(parseInt(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-slate-500">
            Higher values process faster but use more resources
          </span>
        </div>

        {/* Status Messages */}
        {isRunning && (
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            Processing {stats.processing} files...
          </div>
        )}

        {stats.failed > 0 && !isRunning && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
            <AlertCircle size={16} />
            {stats.failed} files failed to process. Click "Retry Failed" to try again.
          </div>
        )}

        {stats.completed === stats.total && stats.total > 0 && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
            ✓ All files processed successfully!
          </div>
        )}
      </CardContent>
    </Card>
  );
}