# 💡 Feature Spec 04: Great Ife 5.0 CGPA / GPA Engine & Target Forecaster

> **Source**: Audio Note 7 (from Core Team) & Master Product Matrix  
> **Status**: *Ideation / Review*  
> **Target Audience**: All OAU Students (Freshmen to Final Year)

---

## 🎯 The Core Problem
First-year academic results at Obafemi Awolowo University set the tone for a student's entire university degree.
* Freshmen do not understand the math behind **Total Credit Units (TCU)** vs **Total Quality Points (TQP)**.
* Many students miscalculate their grade point averages or don't know the exact boundary lines between degree classifications.
* Students want to know: *"If I get a 3.80 in Harmattan Semester, what GPA must I score in Rain Semester to finish 100-level with a Second Class Upper (3.50+)?"*

---

## 🧮 OAU Academic Regulations & Grading Matrix

Obafemi Awolowo University operates on a **5.00 Grade Point Scale**:

| Score Range | Letter Grade | Grade Point (GP) | Description |
| :---: | :---: | :---: | :--- |
| **70% – 100%** | **A** | **5** | Excellent |
| **60% – 69%** | **B** | **4** | Very Good |
| **50% – 59%** | **C** | **3** | Good |
| **45% – 49%** | **D** | **2** | Fair |
| **40% – 44%** | **E** | **1** | Pass |
| **0% – 39%** | **F** | **0** | Fail |

### Degree Classifications (Cumulative GPA)
*   **4.50 – 5.00**: 🌟 **First Class Honours**
*   **3.50 – 4.49**: 🎖️ **Second Class Honours (Upper Division / 2:1)**
*   **2.40 – 3.49**: 📘 **Second Class Honours (Lower Division / 2:2)**
*   **1.50 – 2.39**: 📙 **Third Class Honours**
*   **1.00 – 1.49**: ⚠️ **Pass**
*   **Below 1.00**: 🚨 **Academic Probation / Advisory**

---

## ⚙️ Core Engine Features

### 1. Semester GPA Calculator
*   Dynamic course adder (Course Code, Units: 1 to 6, Grade: A to F).
*   Pre-loaded 100-level course templates by Faculty:
    *   *Science/Health Sciences*: `MTH 101` (4), `CHM 101` (3), `PHY 101` (4), `BIO 101` (3), `CHM 107` (1), `PHY 107` (1), `GST 101` (2).
    *   *Technology*: `MTH 101` (4), `PHY 101` (4), `CHM 101` (3), `ME 101` (2), `TPD 101` (1), `GST 101` (2).
*   Real-time recalculation on grade change.

### 2. Cumulative CGPA Tracker (Multi-Semester)
*   Combine Harmattan Semester + Rain Semester to compute year-end CGPA.
*   Formula: 
    $$\text{CGPA} = \frac{\sum \text{Total Quality Points (All Semesters)}}{\sum \text{Total Units (All Semesters)}}$$

### 3. Target GPA Forecaster ("What If?" Planner)
*   Input: Current CGPA + Target Degree Classification (e.g. Aiming for 4.50).
*   Output: Minimum required GPA and letter grade breakdown needed in upcoming semesters.

---

## 👥 Team Action Items
- [ ] Review the reference CGPA calculator link/build mentioned by the teammate in Audio 7.
- [ ] Gather verified 100-level course credit unit breakdowns for Humanities, Law, Admin, and EDM.
