using business_logic.Models;
using business_logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_logic.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Create(UserRegister userRegister)
    {
        UserService userManagement = new UserService();
        MongoDbUser user = new MongoDbUser();
        user.Email = userRegister.Email;
        user.Password = userRegister.Password;
        user.Username = userRegister.Username;
        if (userRegister.IsAdmin)
        {
            user.UserRole = UserRole.Admin;
        }
        else
        {
            user.UserRole = UserRole.Teacher;
        }

        userManagement.CreateUser(user);
        return CreatedAtAction(nameof(Create), user);
    }

    [HttpPost]
    [Route("login")]
    public IActionResult Login(UserLogin user)
    {
        try
        {
            var result = this.UserService.AuthenticateUser(user);
            return Ok(result);
        }
        catch
        {
            return NotFound();
        }
    }

    [HttpPost]
    [Route("delete")]
    public IActionResult Delete(MongoDbUser user)
    {
        UserService userManagement = new UserService();
        try
        {
            userManagement.DeleteUser(user);
            return Ok();
        }
        catch
        {
            return NotFound();
        }
        
    }

    [HttpGet]
    [Route("usernames")]
    public IActionResult GetTakenUsernames()
    {
        List<string> usernames = this.UserService.GetTakenUsernames();

        return Ok(usernames);
    }

    [HttpGet]
    [Route("teachers")]
    public IActionResult GetAllTeachers()
    {
        List<User> teachers = this.UserService.GetAllTeachers();
        return Ok(teachers);
    }
}