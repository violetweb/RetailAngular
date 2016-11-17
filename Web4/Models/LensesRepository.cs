using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using App.Web4.Models;

namespace App.Web4.Models
{


    public class LensesRepository : ILensesRepository
    {

        
        private RetailDB.BrainsEntities db = null;


        public LensesRepository()
        {
            this.db = new RetailDB.BrainsEntities();
        }

        public LensesRepository(RetailDB.BrainsEntities db)
        {
            this.db = db;
        }

        public IEnumerable<Lenses> SelectAll()
        {
            return db.RetailLenses.ToList();
        }

        public RetailLenses SelectByID(string id)
        {
            return .Find(id);
            return db.Retail_FillContactLenses_Result.Find(id);
        }

        public void Insert(Customer obj)
        {
            db.Customers.Add(obj);
        }

        public void Update(Customer obj)
        {
            db.Entry(obj).State = EntityState.Modified;
        }

        public void Delete(string id)
        {
            Customer existing = db.Customers.Find(id);
            db.Customers.Remove(existing);
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}