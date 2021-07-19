using ProductsAPI.ApiView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsAPI
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(string username, string password, UserRole role);
    }
}
