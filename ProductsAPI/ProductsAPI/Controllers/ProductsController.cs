using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.Repositories;
using ProductsAPI.Models;
using ProductsAPI.ApiView;

namespace ProductsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository){
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductView>> GetProducts(){
            return await _productRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductView>> GetProduct(int id){
            return await _productRepository.Get(id);
        }




        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            try
            {
                
                await _productRepository.delete(id);
                return StatusCode(StatusCodes.Status200OK, $"Product with id {id} was deleted successfully");

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] Product product)
        {
            var newProduct = await _productRepository.create(product);
            return CreatedAtAction(nameof(GetProduct), new { id = newProduct.Id }, newProduct);
        }

        [HttpPut]
        public async Task<ActionResult<Product>> PutProduct([FromBody] Product product)
        {
            try
            {
                Product newProduct = await _productRepository.update(product);
                return CreatedAtAction(nameof(GetProduct), new { id = newProduct.Id }, newProduct);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data");
            }
        }
        
        [HttpPatch]
        public async Task<ActionResult> PatchProducts([FromBody] int[] productIds)
        {
            try
            {
                for(int i=0; i<productIds.Length; i++)
                {
                    await _productRepository.archive(productIds[i]);
                }
                return StatusCode(StatusCodes.Status204NoContent, "successfully archived products");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error archiving products");
            }
        }

    }
}
