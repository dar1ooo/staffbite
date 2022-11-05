using business_logic.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using business_logic.Services;

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
        User user = new User();
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
    public async Task<ActionResult<User>> Find(User user)
    {
        UserService userManagement = new UserService();
        var result = await userManagement.authenticateUser(user);
        if (user == null)
        {
            return NotFound();
        }
        return (ActionResult)result;
    }

    [HttpPost]
    [Route("delete")]
    public async Task<IActionResult> Delete(User user)
    {
        UserService userManagement = new UserService();
        userManagement.deleteUser(user);
        return CreatedAtAction(nameof(Create), user);
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
        List<Teacher> teachers = this.UserService.GetAllTeachers();
        return Ok(teachers);
    }
}

