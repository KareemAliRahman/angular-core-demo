using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.Repositories;
using ProductsAPI.Models;

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
        public async Task<IEnumerable<Product>> GetProducts(){
            return await _productRepository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            return await _productRepository.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] Product product){
            var newProduct = await _productRepository.create(product);
            return CreatedAtAction(nameof(GetProduct), new {id = newProduct.Id}, newProduct);
        }

    }
}
