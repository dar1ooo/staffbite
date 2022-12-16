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
    /// <summary>
    /// Route to create a user in the database
    /// </summary>
    /// <param name="userRegister"></param>
    /// <returns>Status 200, 404 or 401 and the created user if successful</returns>
    [HttpPost]
    [Route("register")]
    public IActionResult Create(UserRegister userRegister)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        List<string> usernames = _userService.GetTakenUsernames();
        //check for taken usernames
        if (usernames.Any(username => userRegister.Username == username))
        {
            return BadRequest(ModelState);
        }

        //create mongodb user to save in the database
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

        //creates user in db
        _userService.CreateUser(user);
        return CreatedAtAction(nameof(Create), user);
    }

    /// <summary>
    /// Route for login
    /// </summary>
    /// <param name="user"></param>
    /// <returns>404 or 200 and returns found user if successful</returns>
    [HttpPost]
    [Route("login")]
    public IActionResult Login(UserLogin user)
    {
        try
        {
            var result = _userService.AuthenticateUser(user);
            if (result == null)
            {
                return NotFound();
            }
            const string userId = "_UserId";
            const string userName = "_UserName";
            //set cookies
            HttpContext.Session.SetString(userId, result.Id.ToString());
            HttpContext.Session.SetString(userName, result.Username.ToString());
            return Ok(result);
        }
        catch
        {
            return NotFound();
        }
    }
    /// <summary>
    /// route to delete user in database
    /// </summary>
    /// <param name="user"></param>
    /// <returns>status 200 or 404</returns>
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
    /// <summary>
    /// route get all usernames from db
    /// </summary>
    /// <returns>list with usernames</returns>
    [HttpGet]
    [Route("usernames")]
    public IActionResult GetTakenUsernames()
    {
        List<string> usernames = _userService.GetTakenUsernames();

        return Ok(usernames);
    }

    /// <summary>
    /// route to get all teachers
    /// </summary>
    /// <returns>list with all teachers</returns>
    [HttpGet]
    [Route("teachers")]
    public IActionResult GetAllTeachers()
    {
        List<User> teachers = _userService.GetAllTeachers();
        return Ok(teachers);
    }
    /// <summary>
    /// route to update user
    /// </summary>
    /// <param name="user"></param>
    /// <returns>200</returns>
    [HttpPost]
    [Route("update")]
    public IActionResult Update(User user)
    {
        _userService.UpdateUser(user);
        return Ok();
    }
}