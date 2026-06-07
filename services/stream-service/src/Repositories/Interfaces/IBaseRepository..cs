using IncidentSphere.StreamService.Models;
using System.Linq.Expressions;

namespace IncidentSphere.StreamService.Repositories.Interfaces;

public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default);

    Task AddAsync(T entity, CancellationToken cancellationToken = default);

    void Update(T entity);

    void Delete(T entity);

    Task<bool> ExistsAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default);

    IQueryable<T> Query();

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}