using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

using System.Web;

namespace App.Web4.Models
{
    public class ILensesRepository<T>
    {

        IEnumerable<RetailLenses> SelectAll();
        RetailLenses SelectByID(string id);
        void Insert(RetailLenses obj);
        void Update(RetailLenses obj);
        void Delete(string id);
        void Save();

    }
}