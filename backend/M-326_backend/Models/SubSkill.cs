﻿namespace business_logic.Models
{
    public class SubSkill
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public bool IsChecked { get; set; }
        public string PdfUrl { get; set; }
        public bool ShowPdf { get; set; }
        public string VideoUrl { get; set; }
        public bool ShowVideo { get; set; }
    }
}