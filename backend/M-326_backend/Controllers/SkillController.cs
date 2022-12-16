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
    /// <summary>
    /// route to create skill
    /// </summary>
    /// <param name="skills"></param>
    /// <returns>200 and the skill</returns>
    [HttpPost]
    [Route("saveSkills")]
    public IActionResult SaveSkills(List<TeacherSkills> skills)
    {
        this.SkillsService.SaveSkills(skills);
        return Ok(skills);
    }
    /// <summary>
    /// route to get all skills
    /// </summary>
    /// <returns>200 and the skills</returns>
    [HttpGet]
    [Route("getSkills")]
    public IActionResult GetSkills()
    {
        return Ok(this.SkillsService.GetSkills());
    }
}