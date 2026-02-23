using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Models;

namespace TaskApi.Services
{
	public class TaskService : ITaskService
	{
		private readonly TaskDbContext _context;

		public TaskService(TaskDbContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<TaskItem>> GetAllAsync()
		{
			return await _context.Tasks.ToListAsync();
		}

		public async Task<TaskItem?> GetByIdAsync(int id)
		{
			return await _context.Tasks.FindAsync(id);
		}

		public async Task<TaskItem> CreateAsync(TaskItem task)
		{
			_context.Tasks.Add(task);
			await _context.SaveChangesAsync();
			return task;
		}

		public async Task<bool> UpdateAsync(int id, TaskItem task)
		{
			var existingTask = await _context.Tasks.FindAsync(id);

			if (existingTask == null)
				return false;

			existingTask.Title = task.Title;
			existingTask.Description = task.Description;
			existingTask.IsCompleted = task.IsCompleted;
			existingTask.DueDate = task.DueDate;
			existingTask.CreatedAt = task.CreatedAt;

			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<bool> DeleteAsync(int id)
		{
			var task = await _context.Tasks.FindAsync(id);
			if (task == null)
				return false;

			_context.Tasks.Remove(task);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}