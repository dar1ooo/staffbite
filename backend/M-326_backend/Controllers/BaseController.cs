using business_logic.Interfaces;
using business_logic.Services;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Serialization;

namespace business_logic.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly IUserService _userService;
        public BaseController(IUserService service)
        {
            _userService = service;
        }
        //public IUserService UserService
        //{ get { return new UserService(); } }

        public ISkillsService SkillsService
        { get { return new SkillsService(); } }
    }
}