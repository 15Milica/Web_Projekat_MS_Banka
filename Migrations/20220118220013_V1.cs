using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MS_Banka.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JMBG = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Nalog",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Lozinka = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    JMBG = table.Column<int>(type: "int", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nalog", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Nalog_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Racun",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojRacuna = table.Column<long>(type: "bigint", nullable: false),
                    Stanje = table.Column<double>(type: "float", nullable: false),
                    RaspolozivoStanje = table.Column<double>(type: "float", nullable: false),
                    Valuta = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    DatumOtvaranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumZatvaranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Racun", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Racun_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Kartica",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojKartice = table.Column<long>(type: "bigint", nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Aktivna = table.Column<bool>(type: "bit", nullable: false),
                    OsnovnaDodatna = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    DatumVazenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RacunID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kartica", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Kartica_Racun_RacunID",
                        column: x => x.RacunID,
                        principalTable: "Racun",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Transakcija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Iznos = table.Column<double>(type: "float", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Datum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SaRacunaID = table.Column<int>(type: "int", nullable: true),
                    NaRacunID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transakcija", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Transakcija_Racun_NaRacunID",
                        column: x => x.NaRacunID,
                        principalTable: "Racun",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transakcija_Racun_SaRacunaID",
                        column: x => x.SaRacunaID,
                        principalTable: "Racun",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kartica_RacunID",
                table: "Kartica",
                column: "RacunID");

            migrationBuilder.CreateIndex(
                name: "IX_Nalog_KorisnikID",
                table: "Nalog",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Racun_KorisnikID",
                table: "Racun",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Transakcija_NaRacunID",
                table: "Transakcija",
                column: "NaRacunID");

            migrationBuilder.CreateIndex(
                name: "IX_Transakcija_SaRacunaID",
                table: "Transakcija",
                column: "SaRacunaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kartica");

            migrationBuilder.DropTable(
                name: "Nalog");

            migrationBuilder.DropTable(
                name: "Transakcija");

            migrationBuilder.DropTable(
                name: "Racun");

            migrationBuilder.DropTable(
                name: "Korisnik");
        }
    }
}
