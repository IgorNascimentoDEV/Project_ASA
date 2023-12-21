using Api.Domain.Interfaces;
using Api.Infrastructure.Context;

namespace Api.Infrastructure.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        private readonly ApplicationDbContext _context;
        public BaseRepository(ApplicationDbContext context)
        {
            this._context = context;
        }



        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0; 
        }
    }
}
