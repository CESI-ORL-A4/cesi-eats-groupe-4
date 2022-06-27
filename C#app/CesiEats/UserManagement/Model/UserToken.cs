using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CesiEats.UserManagement.Model
{
    public class UserToken
    {
        public string Token { get; set; }
        public string Role { get; set; }
        public string UserId { get; set; }

        public UserToken(string token, string role, string userId)
        {
            Token = token;
            Role = role;
            UserId = userId;
        }
    }
}
