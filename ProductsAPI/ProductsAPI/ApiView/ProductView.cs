using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsAPI.ApiView
{
    public class ProductView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Created_by_id { get; set; }
        public int Category_id { get; set; }
        public string Created_by_name { get; set; }
        public string category_name { get; set; }
        public DateTime Created_at { get; set; }
        public bool Is_archived { get; set; }
    }
}
