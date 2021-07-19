using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.Models;
using ProductsAPI.Repositories;
using ProductsAPI.ApiView;
using Microsoft.AspNetCore.Authorization;

namespace ProductsAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        
        [HttpGet]
        public async Task<IEnumerable<CategoryView>> GetCategories()
        {
            return await _categoryRepository.Get();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryView>> GetCategory(int id)
        {
            return await _categoryRepository.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromBody] Category category)
        {
            var newCategory = await _categoryRepository.create(category);
            return CreatedAtAction(nameof(GetCategory), new { id = newCategory.Id }, newCategory);
        }


        [HttpPut]
        public async Task<ActionResult> PutCategory([FromBody] Category category)
        {
            try
            {
                var newCategory = await _categoryRepository.update(category);
                return CreatedAtAction(nameof(GetCategory), new { id = newCategory.Id }, newCategory);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data");
            }
            //return StatusCode(StatusCodes.Status200OK, $"Category with id {category.Id} was updated successfully");
            
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            try
            {
                Category category = await _categoryRepository.GetProducts(id);
                if (category == null)
                {
                    return NotFound($"Category with id = {id} not found");
                }
                if(category.Products.Count > 0)
                {
                    return StatusCode(StatusCodes.Status409Conflict, $"Products exits for Category with id = {id}. Cannot delete Category");
                }
                await _categoryRepository.delete(id);
                return StatusCode(StatusCodes.Status200OK, $"Category with id {id} was deleted successfully");

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Error deleting data");
            }
        }

    }
}
