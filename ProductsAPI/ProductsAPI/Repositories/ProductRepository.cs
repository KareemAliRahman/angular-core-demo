using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.Models;

namespace ProductsAPI.Repositories
{
  public class ProductRepository : IProductRepository
  {
    private readonly productContext _context;

    public ProductRepository(productContext context){
        _context = context;
    }
    public async Task<Product> create(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task delete(int id)
    {
        Product product = await _context.Products.FindAsync(id);
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return;
    }

    public async Task<IEnumerable<Product>> Get()
    {
      return await _context.Products.ToListAsync();
    }

    public async Task<Product> Get(int id)
    {
      return await _context.Products.FindAsync(id);
    }


    public async Task update(Product product)
    {
      _context.Entry(product).State = EntityState.Modified;
      await _context.SaveChangesAsync();
    }

    public async Task archive(int id){
      Product product = new Product(){Id = id, IsArchived = true};
      _context.Products.Attach(product);
      _context.Entry(product).Property(x => x.IsArchived).IsModified = true;
      await _context.SaveChangesAsync();
    }
  }
}
