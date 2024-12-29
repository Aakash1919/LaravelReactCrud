<?php

namespace App\Services;

use App\Http\Resources\TaskResource;
use App\Models\Task;

class TaskService
{
  public function show() {
    return TaskResource::collection(Task::all());
  }

  public function showByTask($task)
  {
    return new TaskResource($task);
  }
  public function createOrUpdate($task = null, $request)
  {
    if ($task) {
      $task->update($request->all());
    } else {
      $task = Task::create($request->all());
    }
  }
  public function delete($task) {
    $task->delete();
  }
}
