using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.Models;

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

    public async Task<IEnumerable<Category>> Get()
    {
      return await _context.Categories.ToListAsync();
    }

    public async Task<Category> Get(int id)
    {
      return await _context.Categories.FindAsync(id);
    }
  }
}
