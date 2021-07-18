using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.Models;
using ProductsAPI.ApiView;

namespace ProductsAPI.Repositories
{
  public class CategoryRepository : ICategoryRepository
  {
    private readonly productContext _context;

    public CategoryRepository(productContext context){
      _context = context;
    }
    public async Task<Category> create(Category category)
    {
      _context.Categories.Add(category);
      await _context.SaveChangesAsync();
      
      return category;
    }

    public async Task<IEnumerable<CategoryView>> Get()
    {
      // return await _context.Categories.Include(c => c.Products).ToListAsync();
      return await _context.Categories.Select(c => new CategoryView{
        Id = c.Id,
        Name = c.Name,
        Description = c.Description,
        CreatedByName = _context.People.Where(p => p.Id == c.CreatedBy).Select(p => p.Name).SingleOrDefault()
      }).ToListAsync();
    }

    public async Task<CategoryView> Get(int id)
    {
      // return await _context.Categories.FindAsync(id);
      return await _context.Categories
      .Where(c => c.Id == id)
      .Select(c => new CategoryView{
        Id = c.Id,
        Name = c.Name,
        Description = c.Description,
        CreatedByName = _context.People.Where(p => p.Id == c.CreatedBy).Select(p => p.Name).SingleOrDefault()
      }).FirstAsync();
    }

    public async Task delete(int id)
    {
       Category category = await _context.Categories.FindAsync(id);
       _context.Categories.Remove(category);
       await _context.SaveChangesAsync();
       //return category;
    }



    public async Task<Category> GetProducts(int id)
    {

       return await _context.Categories.Include(c => c.Products).FirstAsync(c => c.Id == id);
       //return products;
    }
    public async Task<Category> update(Category category)
    {
        _context.Entry(category).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return category;
    }

  }
}
