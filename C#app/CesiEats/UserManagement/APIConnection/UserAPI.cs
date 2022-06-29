using CesiEats.UserManagement.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace CesiEats.UserManagement.APIConnection
{
    public static class UserAPI
    {
        public static HttpClient client = new HttpClient();
        public static void Init(UserToken userToken)
        {
            if(client.DefaultRequestHeaders.Authorization == null)
            {
                client.BaseAddress = new Uri("http://localhost:4000/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", userToken.accessToken);

            }
        }
        public static async Task<bool> CreateUserAsync(User user)
        {
            var parameters = new Dictionary<string, string> { { "email", user.Email }, { "firstName", user.FirstName }, { "role", user.Role }, { "address", user.Address }, { "lastName", user.LastName }, { "password", user.Password }, { "phone", user.Phone }, { "birthdate", user.Birthdate } };
            var encodedContent = new FormUrlEncodedContent(parameters);
            HttpResponseMessage response = await client.PostAsync(
                "users/register", encodedContent);
            Trace.WriteLine(response.IsSuccessStatusCode);
            string result = response.Content.ReadAsStringAsync().Result;
            Trace.WriteLine(result);
            // return URI of the created resource.
            return response.IsSuccessStatusCode;
        }

        public static async Task<List<User>> GetUsersAsync()
        {
            UserListConnection users = null;
            HttpResponseMessage response = null;
            try
            {
                response = await client.GetAsync("/users");
            }
            catch (Exception)
            {
                Trace.WriteLine("error");
                return null;
            }            
            if (response.IsSuccessStatusCode)
            {
                var jsonString = await response.Content.ReadAsStringAsync();
                Trace.WriteLine("json");
                Trace.WriteLine(jsonString);
                users = JsonConvert.DeserializeObject<UserListConnection>(jsonString);
                
            }
            return users?.users;
        }
        public static async Task<bool> UpdateUserAsync(User user)
        {
            var parameters = new Dictionary<string, string> { { "email", user.Email }, { "address", user.Address }, { "lastName", user.LastName }, { "firstName", user.FirstName }, { "role", user.Role }, { "phone", user.Phone }, { "birthdate", user.Birthdate } };
            if(user.Password != "")
                parameters.Add("password",user.Password);
            var encodedContent = new FormUrlEncodedContent(parameters);
            HttpResponseMessage response = await client.PutAsync(
                $"/users/{user.Id}", encodedContent);
            Trace.WriteLine(response.IsSuccessStatusCode);
            // return URI of the created resource.
            return response.IsSuccessStatusCode;
        }

        public static async Task<HttpStatusCode> DeleteUserAsync(string id)
        {
            HttpResponseMessage response = await client.DeleteAsync(
                $"/users/{id}");
            Trace.WriteLine(response.IsSuccessStatusCode);
            return response.StatusCode;
        }
    }
}
