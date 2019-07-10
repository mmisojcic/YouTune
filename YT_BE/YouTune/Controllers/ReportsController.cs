using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouTune.DTOs;
using YouTune.Models;
using YouTune.Services;

namespace YouTune.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ReportService _reportService;

        public ReportsController(AppDbContext context, ReportService reportService)
        {
            _context = context;
            _reportService = reportService;
        }

        // GET: api/Reports
        [HttpGet]
        public IEnumerable<ReportDTO> GetReports()
        {
            return _reportService.GetAll();
        }

        // GET: api/Reports/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReport([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reportDTO = await _reportService.GetOne(id);

            if (reportDTO == null)
            {
                return NotFound();
            }

            return Ok(reportDTO);
        }

        // PUT: api/Reports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReport([FromRoute] long id, [FromBody] Report report)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reportDTO = await _reportService.Update(report, id);

            return Ok(reportDTO);
        }

        // POST: api/Reports
        [HttpPost]
        public async Task<IActionResult> PostReport([FromBody] Report report)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reportDTO = await _reportService.Save(report);

            return Ok(reportDTO);
        }

        // DELETE: api/Reports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDTO = await _reportService.Delete(id);

            if (userDTO == null)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }
        }

        private bool ReportExists(long id)
        {
            return _context.Reports.Any(e => e.ReportId == id);
        }
    }
}