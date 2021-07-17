using ProductsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsAPI.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> Get();

        Task<Product> Get(int id);

        Task<Product> create(Product product);

        Task update(Product product);

        Task delete(int id);

        Task archive(int id);
    }
}
