using business_logic.Interfaces;
using business_logic.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_logic.Controllers
{
    public class BaseController : ControllerBase
    {
        public IUserService UserService
        { get { return new UserService(); } }

        public ISkillsService SkillsService
        { get { return new SkillsService(); } }
    }
}