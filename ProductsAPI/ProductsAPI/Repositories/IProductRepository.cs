using ProductsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.ApiView;

namespace ProductsAPI.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductView>> Get();

        Task<ProductView> Get(int id);

        Task<Product> create(Product product);

        Task<Product> update(Product product);
        
        Task delete(int id);

        Task archive(int id);
    }
}
