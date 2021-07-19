using ProductsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsAPI.Repositories
{
    public interface IPersonRepository
    {
      Task<Person> create(Person person);

      Task<Person> Get(int id);

        Task<Person> Get(string username, string password);
    }
}
