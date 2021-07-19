using System;
using System.Collections.Generic;

#nullable disable

namespace ProductsAPI.Models
{
    public partial class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsArchived { get; set; }

        public virtual Category Category { get; set; }
        public virtual Person CreatedByNavigation { get; set; }
    }
}
