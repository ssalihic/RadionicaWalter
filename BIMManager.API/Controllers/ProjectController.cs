using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BIMManager.Data;

namespace BIMManager.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Project")]
    public class ProjectController : Controller
    {
        BIMManagerContext context;
        public ProjectController(BIMManagerContext _context)
        {
            context = _context;
        }
       

        [HttpGet]
        public IActionResult GetAll()
        {
            var projects = context.Projects.ToList();
            if (projects.Count != 0)
                return Ok(new
                {
                    status = true,
                    data = projects
                });

            return NotFound(new
            {
                status = false
            });
        }
    }
}