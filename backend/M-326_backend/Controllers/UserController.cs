using business_logic.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using business_logic.Services;

namespace business_logic.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Create(UserRegister userRegister)
    {
        UserManagement userManagement = new UserManagement();
        User user = new User(); 
        user.Email = userRegister.Email;
        user.Password = userRegister.Password;
        user.Username = userRegister.Username;
        user.UserRole = 0;

        Random rdm = new Random();
        user.UserId = rdm.Next(100000);
        userManagement.createUser(user);
        return CreatedAtAction(nameof(Create), user);
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<User>> Find(User user)
    {
        UserManagement userManagement = new UserManagement();
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
        UserManagement userManagement = new UserManagement();
        userManagement.deleteUser(user);
        return CreatedAtAction(nameof(Create), user);
    }
}

