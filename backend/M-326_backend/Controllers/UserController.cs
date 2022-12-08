using business_logic.Interfaces;
using business_logic.Models;
using business_logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_logic.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController
{
    public UserController(IUserService service) : base(service)
    {
    }

    [HttpPost]
    [Route("register")]
    public IActionResult Create(UserRegister userRegister)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        MongoDbUser user = new MongoDbUser();
        user.Email = userRegister.Email;
        user.Password = _userService.HashPassword(userRegister.Password);
        user.Username = userRegister.Username;
        if (userRegister.IsAdmin)
        {
            user.UserRole = UserRole.Admin;
        }
        else
        {
            user.UserRole = UserRole.Teacher;
        }

        _userService.CreateUser(user);
        return CreatedAtAction(nameof(Create), user);
    }

    [HttpPost]
    [Route("login")]
    public IActionResult Login(UserLogin user)
    {
        try
        {
            var result = _userService.AuthenticateUser(user);
            if(result == null)
            {
                return NotFound();
            }
            //const string userId = "_UserId";
            //const string userName = "_UserName";

            //HttpContext.Session.SetString(userId, result.Id.ToString());
            //HttpContext.Session.SetString(userName, result.Username.ToString());
            return Ok(result);
        }
        catch
        {
            return NotFound();
        }
    }

    [HttpPost]
    [Route("delete")]
    public IActionResult Delete(User user)
    {
      
        try
        {
            _userService.DeleteUser(user);
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
        List<string> usernames = _userService.GetTakenUsernames();

        return Ok(usernames);
    }

    [HttpGet]
    [Route("teachers")]
    public IActionResult GetAllTeachers()
    {
        List<User> teachers = _userService.GetAllTeachers();
        return Ok(teachers);
    }

    [HttpPost]
    [Route("update")]
    public IActionResult Update(User user)
    {
        _userService.UpdateUser(user);
        return Ok();
    }
}