using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{
    public interface IWebInfoRepository
    {
        IQueryable<Promo> GetPromos();
        Promo Get(int Id);
        bool Insert(Promo promo);
        bool Update(Promo promo);
        bool SaveAll();
    }
}