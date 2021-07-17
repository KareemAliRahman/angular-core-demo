using ProductsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsAPI.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> Get();

        Task<Category> Get(int id);

        Task<Category> create(Category category);

    }
}
