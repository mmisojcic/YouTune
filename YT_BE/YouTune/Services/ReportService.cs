using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YouTune.DTOs;
using YouTune.Models;

namespace YouTune.Services
{
    public class ReportService : IYouTuneRepository<Report, ReportDTO>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ReportService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // DELETE
        public async Task<Report> Delete(long _id)
        {
            var reportData = await _context.Reports.FindAsync(_id);

            if (reportData == null)
            {
                return null;
            }
            else
            {
                _context.Reports.Remove(reportData);
                await _context.SaveChangesAsync();

                return reportData;
            }
        }

        // DELETE LIST
        public Task<IEnumerable<ReportDTO>> DeleteList(IEnumerable<Report> _object)
        {
            throw new NotImplementedException();
        }

        // GET ALL
        public IEnumerable<ReportDTO> GetAll()
        {
            var reportsData = _context.Reports.ToList();
            var reportsDTO = new List<ReportDTO>();

            foreach (Report r in reportsData)
            {

                var userData = _context.Users.Find(r.UserId);
                var songData = _context.Songs.Find(r.SongId);
                var statusData = _context.Statuses.Find(r.StatusId);

                r.User = userData;
                r.Song = songData;
                r.Status = statusData;

                reportsDTO.Add(_mapper.Map<Report, ReportDTO>(r));
            }

            return reportsDTO;
        }

        // GET ONE
        public async Task<ReportDTO> GetOne(long _id)
        {
            var reportData = await _context.Reports.FindAsync(_id);

            if (reportData == null)
            {
                return null;
            }
            else
            {
                var userData = await _context.Users.FindAsync(reportData.UserId);
                var songData = await _context.Songs.FindAsync(reportData.SongId);
                var statusData = await _context.Statuses.FindAsync(reportData.StatusId);

                reportData.User = userData;
                reportData.Song = songData;
                reportData.Status = statusData;

                return _mapper.Map<Report, ReportDTO>(reportData);
            }
        }

        // SAVE
        public async Task<ReportDTO> Save(Report _object)
        {
            _context.Reports.Add(_object);
            await _context.SaveChangesAsync();

            return await GetOne(_object.ReportId);
        }

        public IEnumerable<ReportDTO> SearchByName(string queryString)
        {
            throw new NotImplementedException();
        }

        // UPDATE
        public async Task<ReportDTO> Update(Report _object, long _id)
        {
            if (_id != _object.ReportId)
            {
                return null;
            }

            _context.Entry(_object).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return await GetOne(_id);
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }
        }

        Task<IEnumerable<ReportDTO>> IYouTuneRepository<Report, ReportDTO>.Delete(long _id)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<ReportDTO>> IYouTuneRepository<Report, ReportDTO>.Save(Report _object)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<ReportDTO>> IYouTuneRepository<Report, ReportDTO>.Update(Report _object, long _id)
        {
            throw new NotImplementedException();
        }
    }
}
