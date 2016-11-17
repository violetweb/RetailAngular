using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web; 

namespace App.Web4.Models
{

   
    public class Customer
    {
        public string Customer_ID { get; set; }
        public string Bill_To { get; set; }
        public string Ship_To_Lab { get; set; }
        public string Group_Customer_ID { get; set; }
        public string Reference_Customer_ID { get; set; }
        public string Customer_Name { get; set; }
        public string Street1 { get; set; }
        public string Street2 { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Statement { get; set; }
        public string GroupNO { get; set; }
        public decimal CreditLimit { get; set; }
        public string Courier_ID { get; set; }
        public bool Print_Invoice_Details { get; set; }
        public int Invoice_Copies { get; set; }
        public bool ShippingList { get; set; }
        public System.DateTime TemporaryStatus { get; set; }
        public bool Labels { get; set; }
        public int Rebate_ID { get; set; }
        public string Currency_ID { get; set; }
        public int Creator_ID { get; set; }
        public System.DateTime CreationDate { get; set; }
        public string Profession_ID { get; set; }
        public string SpecialBillTo { get; set; }
        public bool Grand_Father_Account { get; set; }
        public bool CreditApplication { get; set; }
        public Nullable<System.DateTime> CreditApplicationFiledOn { get; set; }
        public string BusinessType { get; set; }
        public string TradeName { get; set; }
        public Nullable<System.DateTime> BusinessStartedOn { get; set; }
        public bool ApplicationSigned { get; set; }
        public bool Apply_Shipping_Charges { get; set; }
        public string Shipping_Charges_Comment { get; set; }
        public int NumberofStores { get; set; }
        public bool DoNotAllowSpecialShip { get; set; }
        public bool ShowCreditLimit { get; set; }
        public string SpecialPricing { get; set; }
        public string CreditRating_ID { get; set; }
        public string WebSite { get; set; }
        public string EMail { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Shipping_Bin { get; set; }
        public string Holding_Bin { get; set; }
        public bool DoNotShipUnderMinimum { get; set; }
        public bool Wants_Starter_Kits { get; set; }
        public bool Requires_Purchase_Order_Number { get; set; }
        public string SendConfirmationVIA { get; set; }
        public bool IncludePriceInConfirmation { get; set; }
        public bool IncludeTrayInConfirmation { get; set; }
        public bool IncludePOinConfirmation { get; set; }
        public bool IncludeStatusInConfirmation { get; set; }
        public string SortingOrderOfConfirmation { get; set; }
        public string Send_Statement { get; set; }
        public string Statement_VIA { get; set; }
        public string Send_Credit_Card_Slip { get; set; }
        public int Book_ID { get; set; }
        public string Language_ID { get; set; }
        public byte Warning_Flag { get; set; }
        public string Password { get; set; }
        public bool Invoice_Print_Rebate_Details { get; set; }
        public bool Invoice_Print_Rebate_Summary { get; set; }
        public string RGP_Starter_Kit { get; set; }
        public string Restocking_Fee { get; set; }
        public string Accounts_Payables_Contact_Name { get; set; }
        public string Accounts_Payables_Email { get; set; }
        public int Sales_Person_ID { get; set; }
        public System.DateTime Last_Statement_Printed_On { get; set; }
        public string Special_Pricing_Customer_ID { get; set; }
        public string Send_Work_Ticket_With_Order { get; set; }
        public System.DateTime Last_Statement_Stored_On { get; set; }
        public int DoNotPhone { get; set; }
        public byte Eyeglass_Lens_Discount { get; set; }
        public byte Automatic_Payment_Discount { get; set; }
        public Nullable<System.DateTime> Last_Confirmation { get; set; }
        public string Email_Daily_Invoices_to { get; set; }
        public int On_Watch { get; set; }
        public string Permanent_BIN { get; set; }
        public string ClientType { get; set; }
        public decimal EL_Monthly_Sales { get; set; }
        public decimal EL_Monthly_Credits { get; set; }
        public decimal EL_Monthly_Sales_6ma { get; set; }
        public decimal EL_Monthly_Credits_6MA { get; set; }
        public decimal EL_Monthly_Sales_LY { get; set; }
        public decimal EL_Monthly_Sales_6MA_LY { get; set; }
        public decimal BCL_Monthly_Sales { get; set; }
        public decimal MCL_Monthly_Sales { get; set; }
        public string Marketing_Email { get; set; }
        public decimal Shipping_Extra_Charge { get; set; }
        public byte Rx_PD_Adjustment { get; set; }
        public byte Rx_Wrap_Power_Adjustment { get; set; }
        public byte Ship_Partial_Orders { get; set; }
        public string Ophthalmic_License_Holder_Name { get; set; }
        public string Ophthalmic_License_Number { get; set; }
        public string Ophthalmic_College { get; set; }
        public Nullable<System.DateTime> Ophthalmic_Information_Verified_Date { get; set; }
        public decimal EL_52WeekHigh { get; set; }
        public decimal EL_52WeekLow { get; set; }
        public string Report_Monthly_SubStatement { get; set; }
        public string Report_Monthly_SubStatement_type { get; set; }
        public byte Monitoring_Type { get; set; }
        public bool Email_Validated { get; set; }
        public bool Apply_All_Discounts_At_Statement_Time { get; set; }
        public string EIN { get; set; }
        public int Oldest_Invoice_To_Still_Take_Orders { get; set; }
        public bool Jena_Web_Dont_List { get; set; }
        public bool Jena_Customer { get; set; }
        public float Rx_Restocking_Fee { get; set; }
        public float Non_Rx_Restocking_Fee { get; set; }
        public bool Rx_Wait_For_Frame_Before_Picking { get; set; }
        public bool Lenscare { get; set; }
        public decimal EL_MTD_Sales { get; set; }
        public decimal EL_MTD_Credits { get; set; }
        public decimal BCL_MTD_Sales { get; set; }
        public decimal MCL_MTD_Sales { get; set; }
        public decimal EL_MTD_Sales_LY { get; set; }
        public bool Rx_Process_No_Stamping { get; set; }
        public bool Rx_Uncut_Stamp { get; set; }
        public bool Rx_Uncut_Dot { get; set; }
        public bool Rx_Edged_Stamp { get; set; }
        public bool Rx_Edged_Dot { get; set; }
        
    } 
}