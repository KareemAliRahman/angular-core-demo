using ProductsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.ApiView;

namespace ProductsAPI.Repositories
{

    public interface ICategoryRepository
    {
        Task<IEnumerable<CategoryView>> Get();

        Task<CategoryView> Get(int id);

        Task<Category> GetProducts(int id);

        Task<Category> create(Category category);
        Task delete(int id);
        Task<Category> update(Category category);
    }
}
