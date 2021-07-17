using System;
using System.Collections.Generic;

#nullable disable

namespace ProductsAPI.Models
{
    public partial class Category
    {
        public Category()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? CreatedBy { get; set; }

        public virtual Person CreatedByNavigation { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
