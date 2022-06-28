using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CesiEats.UserManagement.Model
{
    public class UserToken
    {
        public string accessToken { get; set; } = "";
        public string refreshToken { get; set; } = "";
        public string id { get; set; } = "";
        public string status { get; set; } = "";
        public string role { get; set; } = "";
    }
}
