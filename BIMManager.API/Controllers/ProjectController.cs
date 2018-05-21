using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BIMManager.Data.Abstract;
using BIMManager.Models.Entities;
using BIMManager.Models.ViewModels;
using BIMManager.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Reflection;

namespace BIMManager.API.Controllers
{
    [Produces("application/json")]
    [Route("api/project")]
    [Authorize]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll([FromQuery] string search, [FromQuery] int? limit = 10, [FromQuery] int? skip = 0)
        {
            int totalCount = _projectRepository.Count();

            if (!String.IsNullOrEmpty(search))
            {

                return Ok(new ApiResponse<List<Project>>
                {
                    Meta = new ApiResponseMetadata { Total = totalCount },
                    Result = _projectRepository.GetAll().Where(project => {

                        Type type = project.GetType();
                        bool condition = false;
                        List<PropertyInfo> props = type.GetProperties().ToList();
                        foreach (PropertyInfo prop in props)
                        {
                            condition = condition || (Convert.ToString(prop.GetValue(project)).ToLower()).Contains(search.ToLower());
                            if (condition)
                            {
                                break;
                            }
                        }
                        return condition;
                    }).ToList()
                });
            }

            return Ok(new ApiResponse<List<Project>>
            {
                Meta = new ApiResponseMetadata { Total = totalCount },
                Result = _projectRepository.GetAll().Skip((int)skip).Take((int)limit).ToList()
            });
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateProject([FromBody] ProjectCreateViewModel projectCreateViewModel)
        {
            try {
                Project project = new Project(projectCreateViewModel);
                _projectRepository.Add(project);
                _projectRepository.Commit();

                return Ok(new {
                    Status = true,
                    Result = project
                });
            } catch (Exception e) {

                return BadRequest(new {
                    Status = false,
                    Message = e.Message
                });
            }
        }
    }
}