<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Services\TaskService;
use Inertia\Inertia;

class TaskController extends Controller
{
  public $taskService;

  public function __construct()
  {
    $this->taskService = new TaskService();
  }
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Tasks/Index', [
      'tasks' => $this->taskService->show()
    ]);
  }

  public function create()
  {
    return Inertia::render('Tasks/Edit', [
      'task' => null
    ]);
  }

  public function edit(Task $task)
  {
    return Inertia::render('Tasks/Edit', [
      'task' => $this->taskService->showByTask($task)
    ]);
  }

  public function show(Task $task, TaskRequest $request)
  {
    $this->taskService->createOrUpdate($task, $request);
    return Inertia::render('Tasks/Edit', [
      'task' => $this->taskService->showByTask($task)
    ]);
  }
  /**
   * Store a newly created resource in storage.
   */
  public function store(TaskRequest $request)
  {
    return $this->taskService->createOrUpdate(null, $request);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Task $task, TaskRequest $request)
  {
    return $this->taskService->createOrUpdate($task, $request);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Task $task)
  {
    return $this->taskService->delete($task);
  }
}
