using business_logic.Models;
using Microsoft.AspNetCore.Mvc;

namespace business_logic.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<User> Get()
    {

    }
}