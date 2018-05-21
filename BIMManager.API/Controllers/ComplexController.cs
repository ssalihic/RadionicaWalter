using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using BIMManager.API.Helpers;
using BIMManager.Data.Abstract;
using BIMManager.Models.Entities;
using BIMManager.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BIMManager.API.Controllers
{
    [Produces("application/json")]
    [Route("api/complex")]
    public class ComplexController : Controller
    {
        private readonly IComplexRepository _complexRepository;

        public ComplexController(IComplexRepository complexRepository) {
            _complexRepository = complexRepository;
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] string search, [FromQuery] int? limit = 10, [FromQuery] int? skip = 0)
        {
            int totalCount = _complexRepository.Count();

            if (!String.IsNullOrEmpty(search))
            {

                return Ok(new ApiResponse<List<Complex>>
                {
                    Meta = new ApiResponseMetadata { Total = totalCount },
                    Result = _complexRepository.GetAll().Where(project => {

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

            return Ok(new ApiResponse<List<Complex>>
            {
                Meta = new ApiResponseMetadata { Total = totalCount },
                Result = _complexRepository.GetAll().Skip((int)skip).Take((int)limit).ToList()
            });
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateComplex([FromBody] ComplexCreateViewModel complexCreateViewModel)
        {
            try
            {
                Complex complex = new Complex(complexCreateViewModel);
                _complexRepository.Add(complex);
                _complexRepository.Commit();

                return Ok(new
                {
                    Status = true,
                    Result = complex
                });
            }
            catch (Exception e)
            {

                return BadRequest(new
                {
                    Status = false,
                    Message = e.Message
                });
            }
        }
    }
}