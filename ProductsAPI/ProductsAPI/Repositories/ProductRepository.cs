using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.Models;
using ProductsAPI.ApiView;

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

    public async Task<IEnumerable<ProductView>> Get()
    {
            //return await _context.Products.ToListAsync();
            return await _context.Products.Select(p => new ProductView
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Created_by_id = p.CreatedBy,
                Created_by_name = _context.People.Where(per => per.Id == p.CreatedBy).Select(per => per.Name).SingleOrDefault(),
                Category_id = p.CategoryId,
                category_name = _context.Categories.Where(c => c.Id == p.CategoryId).Select(c => c.Name).SingleOrDefault(),
                Is_archived = p.IsArchived,
                Created_at = p.CreatedAt
            }).ToListAsync();
    }

    public async Task<ProductView> Get(int id)
    {
        //return await _context.Products.FindAsync(id);
        return await _context.Products
            .Where(p => p.Id == id)
            .Select(p => new ProductView
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Created_by_id = p.CreatedBy,
                Created_by_name = _context.People.Where(per => per.Id == p.CreatedBy).Select(per => per.Name).SingleOrDefault(),
                Category_id = p.CategoryId,
                category_name = _context.Categories.Where(c => c.Id == p.CategoryId).Select(c => c.Name).SingleOrDefault(),
                Is_archived = p.IsArchived,
                Created_at = p.CreatedAt
            }).FirstAsync();
        }


    public async Task<Product> update(Product product)
    {
      _context.Entry(product).State = EntityState.Modified;
      await _context.SaveChangesAsync();
      return product;
    }

    public async Task archive(int id){
      Product product = new Product(){Id = id, IsArchived = true};
      _context.Products.Attach(product);
      _context.Entry(product).Property(x => x.IsArchived).IsModified = true;
      await _context.SaveChangesAsync();
    }
  }
}
