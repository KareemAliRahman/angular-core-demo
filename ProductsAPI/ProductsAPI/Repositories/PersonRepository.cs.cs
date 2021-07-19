using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsAPI.Models;

namespace ProductsAPI.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly productContext _context;

        public PersonRepository(productContext context)
        {
            _context = context;
        }

        public async Task<Person> create(Person person)
        {
            _context.People.Add(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task<Person> Get(int id)
        {
            return await _context.People.FindAsync(id);
        }

        public async Task<Person> Get(string username, string password)
        {
            Person person = await _context.People.Where(p => p.Username == username).FirstOrDefaultAsync();
            if(person == null || person.Password != password)
            {
                return null;
            }
            return person;
        }
    }
}
