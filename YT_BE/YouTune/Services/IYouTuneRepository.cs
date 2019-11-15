using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Services
{
    interface IYouTuneRepository<T1, T2>
    {
        IEnumerable<T2> GetAll();
        IEnumerable<T2> SearchByName(string queryString);
        Task<T2> GetOne(long _id);
        Task<IEnumerable<T2>> Save(T1 _object);
        Task<IEnumerable<T2>> Delete(long _id);
        Task<IEnumerable<T2>> DeleteList(IEnumerable<T1> _object);
        Task<IEnumerable<T2>> Update(T1 _object, long _id);
        
    }
}
