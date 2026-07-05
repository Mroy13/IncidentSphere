using IncidentSphere.StreamService.Data;
using IncidentSphere.StreamService.Models;
using IncidentSphere.StreamService.Repositories.Interfaces;
using IncidentSphere.StreamService.Shared.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace IncidentSphere.StreamService.Repositories.Implementations;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly AppDbContext _appDbContext;
    protected readonly DbSet<T> _dbSet;

    public Repository(AppDbContext context)
    {
        _appDbContext = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet.ToListAsync(cancellationToken);
    }

    public async Task AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        await _dbSet.AddAsync(entity, cancellationToken);
    }

    public void Update(T entity)
    {
        _dbSet.Update(entity);
    }

    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
    }

    public async Task<bool> ExistsAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default)
    {
        return await _dbSet.AnyAsync(predicate, cancellationToken);
    }


    // Returns a queryable source for composing database queries without executing them.
    public IQueryable<T> Query()
    {
        return _dbSet.AsQueryable();
    }


    // Persists tracked entity changes to the database and maps database-specific exceptions
    // to application exceptions for consistent API error responses.
    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            return await _appDbContext.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException ex)
        {
            throw ExceptionHelper.Handle(ex);
        }
    }


}