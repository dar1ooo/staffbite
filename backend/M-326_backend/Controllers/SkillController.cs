using business_logic.Interfaces;
using business_logic.Models;
using Microsoft.AspNetCore.Mvc;

namespace business_logic.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillController : BaseController
{
    public SkillController(IUserService service) : base(service)
    {
    }

    [HttpPost]
    [Route("saveSkills")]
    public IActionResult SaveSkills(List<TeacherSkills> skills)
    {
        this.SkillsService.SaveSkills(skills);
        return Ok(skills);
    }

    [HttpGet]
    [Route("getSkills")]
    public IActionResult GetSkills()
    {
        return Ok(this.SkillsService.GetSkills());
    }
}