using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace BIMManager.API.Migrations
{
    public partial class AddComplexEntityUpdateBimModelRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ComplexId",
                table: "BIMModels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityId",
                table: "BIMModels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Complexes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Latitude = table.Column<double>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complexes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Entities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ComplexId = table.Column<int>(nullable: false),
                    Latitude = table.Column<double>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entities_Complexes_ComplexId",
                        column: x => x.ComplexId,
                        principalTable: "Complexes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BIMModels_ComplexId",
                table: "BIMModels",
                column: "ComplexId");

            migrationBuilder.CreateIndex(
                name: "IX_BIMModels_EntityId",
                table: "BIMModels",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Entities_ComplexId",
                table: "Entities",
                column: "ComplexId");

            migrationBuilder.AddForeignKey(
                name: "FK_BIMModels_Complexes_ComplexId",
                table: "BIMModels",
                column: "ComplexId",
                principalTable: "Complexes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BIMModels_Entities_EntityId",
                table: "BIMModels",
                column: "EntityId",
                principalTable: "Entities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BIMModels_Complexes_ComplexId",
                table: "BIMModels");

            migrationBuilder.DropForeignKey(
                name: "FK_BIMModels_Entities_EntityId",
                table: "BIMModels");

            migrationBuilder.DropTable(
                name: "Entities");

            migrationBuilder.DropTable(
                name: "Complexes");

            migrationBuilder.DropIndex(
                name: "IX_BIMModels_ComplexId",
                table: "BIMModels");

            migrationBuilder.DropIndex(
                name: "IX_BIMModels_EntityId",
                table: "BIMModels");

            migrationBuilder.DropColumn(
                name: "ComplexId",
                table: "BIMModels");

            migrationBuilder.DropColumn(
                name: "EntityId",
                table: "BIMModels");
        }
    }
}
