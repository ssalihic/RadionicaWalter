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
        public ProjectController()
        {

        }
        public ICollection<Models.Entities.Project> getAll()
        {
            return context.Projects.ToList();
         
        }

    }
}